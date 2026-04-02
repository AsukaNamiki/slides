<template>
  <div class="hero-leaf-container" ref="container">
    <canvas ref="canvas" class="leaf-canvas" />
    <transition name="fade-text">
      <div v-if="showText" class="hero-text">
        <h1>想い、与える</h1>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['phase-done'])
const container = ref(null)
const canvas = ref(null)
const showText = ref(false)
let animId = null

const palette = ['#35c98a', '#0f9d58', '#0b6e3d', '#8fe7be', '#4dd99b', '#2ab77a', '#07a35a']

function drawHeartLeaf(ctx, x, y, size, color, rotation, alpha) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  const s = size / 100
  ctx.scale(s, s)
  ctx.globalAlpha = alpha

  ctx.beginPath()
  ctx.moveTo(0, 35)
  ctx.bezierCurveTo(-35, -10, -35, -30, 0, -20)
  ctx.bezierCurveTo(35, -30, 35, -10, 0, 35)
  ctx.fillStyle = color
  ctx.fill()

  ctx.strokeStyle = 'rgba(255,255,255,0.35)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, -18)
  ctx.lineTo(0, 32)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, -5)
  ctx.lineTo(-15, -10)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, 10)
  ctx.lineTo(-18, 8)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, -5)
  ctx.lineTo(15, -10)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, 10)
  ctx.lineTo(18, 8)
  ctx.stroke()

  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  for (const [nx, ny] of [[-15,-10],[-18,8],[15,-10],[18,8]]) {
    ctx.beginPath()
    ctx.arc(nx, ny, 1.8, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

onMounted(() => {
  const cvs = canvas.value
  const cont = container.value
  if (!cvs || !cont) return

  const w = cont.offsetWidth
  const h = cont.offsetHeight
  cvs.width = w * 2
  cvs.height = h * 2
  cvs.style.width = w + 'px'
  cvs.style.height = h + 'px'
  const ctx = cvs.getContext('2d')
  ctx.scale(2, 2)

  const LEAF_COUNT = 120
  const leaves = []

  for (let i = 0; i < LEAF_COUNT; i++) {
    const baseSpeed = 4 + Math.random() * 8
    leaves.push({
      x: -60 - Math.random() * w * 0.8,
      y: Math.random() * h,
      size: 18 + Math.random() * 50,
      speedX: baseSpeed,
      speedY: (Math.random() - 0.5) * 1.5,
      wobbleAmp: 2 + Math.random() * 5,
      wobbleFreq: 0.02 + Math.random() * 0.04,
      wobblePhase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 0.35 + Math.random() * 0.55,
      gustFactor: 0.8 + Math.random() * 0.4,
    })
  }

  let frame = 0

  function animate() {
    ctx.clearRect(0, 0, w, h)
    frame++

    // 突風の強弱（サイン波で全体の速度が揺れる）
    const gust = 1 + 0.3 * Math.sin(frame * 0.015)

    for (const leaf of leaves) {
      const windX = leaf.speedX * gust * leaf.gustFactor
      const wobble = leaf.wobbleAmp * Math.sin(frame * leaf.wobbleFreq + leaf.wobblePhase)

      leaf.x += windX
      leaf.y += leaf.speedY + wobble * 0.3
      leaf.rotation += leaf.rotSpeed * gust

      // 画面外に出たら左からリスポーン
      if (leaf.x > w + 80) {
        leaf.x = -60 - Math.random() * 100
        leaf.y = Math.random() * h
      }
      if (leaf.y < -60) leaf.y = h + 40
      if (leaf.y > h + 60) leaf.y = -40

      drawHeartLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.color, leaf.rotation, leaf.alpha)
    }

    animId = requestAnimationFrame(animate)
  }

  animate()

  setTimeout(() => { showText.value = true }, 2800)
  setTimeout(() => { emit('phase-done') }, 5000)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.hero-leaf-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #f0faf4 0%, #dff5ea 50%, #c8edda 100%);
}

.leaf-canvas {
  position: absolute;
  inset: 0;
}

.hero-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.hero-text h1 {
  font-size: 72px;
  font-weight: 900;
  color: #0b6e3d;
  text-shadow: 0 4px 30px rgba(255, 255, 255, 0.9);
  letter-spacing: 0.15em;
}

.fade-text-enter-active {
  transition: opacity 1.5s ease;
}
.fade-text-enter-from {
  opacity: 0;
}
</style>
