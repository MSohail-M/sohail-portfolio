import * as THREE from 'three';

interface CameraKeyframe {
  scroll: number;
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

const KEYFRAMES: CameraKeyframe[] = [
  {
    scroll: 0,
    pos: new THREE.Vector3(0, 0.4, 6.2),
    target: new THREE.Vector3(0, 0.15, 0),
    fov: 38,
  },
  {
    scroll: 900,
    pos: new THREE.Vector3(2.6, 0.2, 4.3),
    target: new THREE.Vector3(0, 0, 0),
    fov: 41,
  },
  {
    scroll: 1900,
    pos: new THREE.Vector3(0.3, 1.9, 3.2),
    target: new THREE.Vector3(0, -0.3, 0),
    fov: 35,
  },
  {
    scroll: 3000,
    pos: new THREE.Vector3(-2.8, 0.6, 4.8),
    target: new THREE.Vector3(0.3, 0.1, 0),
    fov: 40,
  },
  {
    scroll: 3900,
    pos: new THREE.Vector3(0, 0.2, 9.2),
    target: new THREE.Vector3(0, 0, 0),
    fov: 44,
  },
];

export class ProceduralEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private animFrameId = 0;
  private isDisposed = false;

  // Node graph objects
  private nodeCount = 96;
  private nodePositions: THREE.Vector3[] = [];
  private basePositions: THREE.Vector3[] = [];
  private nodeVelocities: THREE.Vector3[] = [];
  private instancedNodes: THREE.InstancedMesh | null = null;
  private lineSegments: THREE.LineSegments | null = null;
  private lineGeometry: THREE.BufferGeometry | null = null;
  private dummy = new THREE.Object3D();

  // Lights
  private violetLight!: THREE.PointLight;
  private emberLight!: THREE.PointLight;
  private ambientLight!: THREE.AmbientLight;
  private dirLight!: THREE.DirectionalLight;

  // Signal Grid
  private gridGroup!: THREE.Group;

  // Interpolation helpers
  private currentCameraTarget = new THREE.Vector3(0, 0.15, 0);

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070516);
    this.scene.fog = new THREE.FogExp2(0x070516, 0.052);

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight || 1;
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    this.camera.position.set(0, 0.4, 6.2);

    // 3. Renderer setup
    try {
      this.renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        alpha: false,
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.08;
      this.container.appendChild(this.renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to CSS mode:', e);
      document.documentElement.classList.add('no-gl');
      this.dispose();
      return;
    }

    // 4. Lighting setup
    this.ambientLight = new THREE.AmbientLight(0xa09cc4, 0.55);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.35);
    this.dirLight.position.set(5, 8, 5);
    this.scene.add(this.dirLight);

    this.violetLight = new THREE.PointLight(0x7c5cff, 4.5, 14);
    this.violetLight.position.set(1.5, 0.8, 2.0);
    this.scene.add(this.violetLight);

    this.emberLight = new THREE.PointLight(0xf7941e, 3.2, 12);
    this.emberLight.position.set(-1.8, -0.5, 1.2);
    this.scene.add(this.emberLight);

    // 5. Build Sub-scenes
    this.gridGroup = new THREE.Group();
    this.buildSignalGrid();
    this.buildNodeGraph();

    // 6. Event listeners
    window.addEventListener('resize', this.onResize);
    this.startLoop();
  }

  private buildSignalGrid() {
    const size = 30;
    const divisions = 30;
    const gridHelper = new THREE.GridHelper(size, divisions, 0x7c5cff, 0x241d47);
    gridHelper.position.y = -2.2;
    // Lower opacity on grid lines
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.35;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.35;
    }
    this.gridGroup.add(gridHelper);

    // Add subtle ambient floor plane
    const planeGeo = new THREE.PlaneGeometry(40, 40);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x070516,
      transparent: true,
      opacity: 0.8,
    });
    const floor = new THREE.Mesh(planeGeo, planeMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.25;
    this.gridGroup.add(floor);

    this.scene.add(this.gridGroup);
  }

  private buildNodeGraph() {
    // 96 nodes distributed in a natural organic architecture cluster
    const sphereGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf6f4ff,
      emissive: 0x7c5cff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    this.instancedNodes = new THREE.InstancedMesh(sphereGeo, sphereMat, this.nodeCount);
    this.instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Generate node initial positions
    for (let i = 0; i < this.nodeCount; i++) {
      // Clustered architecture: biased slightly right of center as per spec
      const radius = 0.4 + Math.pow(Math.random(), 0.7) * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = radius * Math.cos(theta) * Math.cos(phi) + 0.4;
      const y = radius * Math.sin(phi) * 0.75 + 0.1;
      const z = radius * Math.sin(theta) * Math.cos(phi) * 0.9;

      const pos = new THREE.Vector3(x, y, z);
      this.nodePositions.push(pos.clone());
      this.basePositions.push(pos.clone());
      this.nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003
        )
      );

      this.dummy.position.copy(pos);
      // Give nearest node a glowing ember accent scale
      const scale = i === 0 ? 1.6 : 0.7 + Math.random() * 0.6;
      this.dummy.scale.set(scale, scale, scale);
      this.dummy.updateMatrix();
      this.instancedNodes.setMatrixAt(i, this.dummy.matrix);

      if (i === 0) {
        // Special ember accent node
        this.instancedNodes.setColorAt(i, new THREE.Color(0xf7941e));
      } else if (i % 4 === 0) {
        this.instancedNodes.setColorAt(i, new THREE.Color(0x7c5cff));
      } else {
        this.instancedNodes.setColorAt(i, new THREE.Color(0xd8d3f2));
      }
    }

    if (this.instancedNodes.instanceColor) {
      this.instancedNodes.instanceColor.needsUpdate = true;
    }
    this.instancedNodes.instanceMatrix.needsUpdate = true;
    this.scene.add(this.instancedNodes);

    // Initial Line segments connecting nearest neighbors
    const maxLineSegments = 240;
    const linePositions = new Float32Array(maxLineSegments * 6);
    this.lineGeometry = new THREE.BufferGeometry();
    this.lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    this.lineSegments = new THREE.LineSegments(this.lineGeometry, lineMaterial);
    this.scene.add(this.lineSegments);
  }

  private updateNodes(time: number) {
    if (!this.instancedNodes || !this.lineSegments || !this.lineGeometry) return;

    // Organic drift
    for (let i = 0; i < this.nodeCount; i++) {
      const base = this.basePositions[i];
      const pos = this.nodePositions[i];

      const ox = Math.sin(time * 0.4 + i * 0.2) * 0.08;
      const oy = Math.cos(time * 0.3 + i * 0.3) * 0.08;
      const oz = Math.sin(time * 0.35 + i * 0.15) * 0.08;

      pos.set(base.x + ox, base.y + oy, base.z + oz);

      this.dummy.position.copy(pos);
      const scale = i === 0 ? 1.6 : 0.7 + (Math.sin(time + i) + 1) * 0.15;
      this.dummy.scale.set(scale, scale, scale);
      this.dummy.updateMatrix();
      this.instancedNodes.setMatrixAt(i, this.dummy.matrix);
    }
    this.instancedNodes.instanceMatrix.needsUpdate = true;

    // Update nearest-neighbour line positions
    const posAttr = this.lineGeometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    let lineIdx = 0;
    const maxLines = array.length / 6;
    const maxDistSq = 1.35 * 1.35;

    for (let i = 0; i < this.nodeCount && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < this.nodeCount && lineIdx < maxLines; j++) {
        const p1 = this.nodePositions[i];
        const p2 = this.nodePositions[j];
        const distSq = p1.distanceToSquared(p2);

        if (distSq < maxDistSq) {
          const ptr = lineIdx * 6;
          array[ptr] = p1.x;
          array[ptr + 1] = p1.y;
          array[ptr + 2] = p1.z;
          array[ptr + 3] = p2.x;
          array[ptr + 4] = p2.y;
          array[ptr + 5] = p2.z;
          lineIdx++;
        }
      }
    }

    // Zero out unused line segments
    for (let k = lineIdx * 6; k < array.length; k++) {
      array[k] = 0;
    }
    posAttr.needsUpdate = true;

    // Animate point lights around hero node
    this.violetLight.position.x = 1.5 + Math.sin(time * 0.5) * 0.6;
    this.violetLight.position.y = 0.8 + Math.cos(time * 0.6) * 0.4;
    this.emberLight.position.x = -1.8 + Math.cos(time * 0.4) * 0.5;
  }

  private interpolateCamera(scrollY: number, mouseX: number, mouseY: number) {
    // Find keyframe interval
    let k1 = KEYFRAMES[0];
    let k2 = KEYFRAMES[KEYFRAMES.length - 1];

    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
      if (scrollY >= KEYFRAMES[i].scroll && scrollY <= KEYFRAMES[i + 1].scroll) {
        k1 = KEYFRAMES[i];
        k2 = KEYFRAMES[i + 1];
        break;
      }
    }

    let progress = 0;
    if (k2.scroll > k1.scroll) {
      progress = Math.min(Math.max((scrollY - k1.scroll) / (k2.scroll - k1.scroll), 0), 1);
    } else if (scrollY >= KEYFRAMES[KEYFRAMES.length - 1].scroll) {
      k1 = KEYFRAMES[KEYFRAMES.length - 1];
      k2 = KEYFRAMES[KEYFRAMES.length - 1];
      progress = 1;
    }

    // Smoothstep easing for cinematic motion
    const t = progress * progress * (3 - 2 * progress);

    const targetPos = new THREE.Vector3().lerpVectors(k1.pos, k2.pos, t);
    const targetLookAt = new THREE.Vector3().lerpVectors(k1.target, k2.target, t);
    const targetFov = k1.fov + (k2.fov - k1.fov) * t;

    // Subtle pointer parallax offset
    const parallaxX = mouseX * 0.35;
    const parallaxY = mouseY * 0.25;

    this.camera.position.x = targetPos.x + parallaxX;
    this.camera.position.y = targetPos.y + parallaxY;
    this.camera.position.z = targetPos.z;

    this.currentCameraTarget.lerp(targetLookAt, 0.1);
    this.camera.lookAt(this.currentCameraTarget);

    if (Math.abs(this.camera.fov - targetFov) > 0.05) {
      this.camera.fov = targetFov;
      this.camera.updateProjectionMatrix();
    }
  }

  public update(scrollY: number, mouseX: number, mouseY: number, time: number) {
    if (this.isDisposed || !this.renderer) return;

    this.interpolateCamera(scrollY, mouseX, mouseY);
    this.updateNodes(time);

    // Subtle node graph rotation
    if (this.instancedNodes) {
      this.instancedNodes.rotation.y = time * 0.04 + scrollY * 0.0004;
    }
    if (this.lineSegments) {
      this.lineSegments.rotation.y = time * 0.04 + scrollY * 0.0004;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onResize = () => {
    if (!this.renderer || this.isDisposed) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height || 1;
    this.camera.updateProjectionMatrix();

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
  };

  private startLoop = () => {
    const render = (now: number) => {
      if (this.isDisposed) return;

      const time = now * 0.001;
      const root = document.documentElement;
      const scrollY = parseFloat(root.style.getPropertyValue('--scroll-y')) || window.scrollY || 0;
      const mouseX = parseFloat(root.style.getPropertyValue('--mx')) || 0;
      const mouseY = parseFloat(root.style.getPropertyValue('--my')) || 0;

      this.update(scrollY, mouseX, mouseY, time);

      this.animFrameId = requestAnimationFrame(render);
    };

    this.animFrameId = requestAnimationFrame(render);
  };

  public dispose() {
    this.isDisposed = true;
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);

    if (this.lineGeometry) this.lineGeometry.dispose();
    if (this.instancedNodes) {
      this.instancedNodes.geometry.dispose();
      if (Array.isArray(this.instancedNodes.material)) {
        this.instancedNodes.material.forEach((m) => m.dispose());
      } else {
        this.instancedNodes.material.dispose();
      }
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
  }
}
