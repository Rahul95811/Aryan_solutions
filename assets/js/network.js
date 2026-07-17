/**
 * Hero Network Canvas - Subtle animated network effect
 */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let nodes = [];
  let animationId;
  let width, height;

  const NODE_COUNT = 80;
  const CONNECTION_DISTANCE = 150;
  const NODE_COLOR = 'rgba(6, 182, 212, 0.5)'; // Secondary Accent (Cyan)
  const LINE_COLOR = 'rgba(59, 130, 246, 0.15)'; // Primary Accent (Blue)

  let mouseX = -1000;
  let mouseY = -1000;

  // Add mouse tracking for parallax/interaction
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initNodes();
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseX: 0,
        baseY: 0
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((node) => {
      // Mouse avoidance / interaction
      const dxMouse = mouseX - node.x;
      const dyMouse = mouseY - node.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      
      if (distMouse < 150) {
        node.x -= dxMouse * 0.02;
        node.y -= dyMouse * 0.02;
      }

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    draw();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
      draw();
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    resize();
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.fill();
    });
  } else {
    init();
  }
})();
