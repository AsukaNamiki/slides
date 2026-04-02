<template>
  <div class="cosmos-container" ref="container">
    <canvas ref="canvas" class="cosmos-canvas" />
    <transition name="cosmos-text">
      <div v-if="showText" class="cosmos-message">
        <h1>愛が実り、循環する宇宙へ</h1>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const container = ref(null)
const canvas = ref(null)
const showText = ref(false)
let animId = null
let started = false

// ハート型の葉を描画
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
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, -18)
  ctx.lineTo(0, 32)
  ctx.stroke()
  ctx.restore()
}

// 地球を描画
function drawEarth(ctx, cx, cy, r, frame) {
  ctx.save()

  // 大気の光彩
  const atmoGrad = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.4)
  atmoGrad.addColorStop(0, 'rgba(100, 200, 255, 0.15)')
  atmoGrad.addColorStop(1, 'rgba(100, 200, 255, 0)')
  ctx.fillStyle = atmoGrad
  ctx.beginPath()
  ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2)
  ctx.fill()

  // 地球本体（クリップ）
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()

  // 海
  const oceanGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r)
  oceanGrad.addColorStop(0, '#4fc3f7')
  oceanGrad.addColorStop(0.5, '#1e88e5')
  oceanGrad.addColorStop(1, '#0d47a1')
  ctx.fillStyle = oceanGrad
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

  // 大陸（ゆっくり回転）
  const offset = (frame * 0.15) % (r * 4)
  ctx.fillStyle = '#2e7d32'
  // アジア大陸風
  drawContinent(ctx, cx + 20 - offset * 0.1, cy - 15, r * 0.35, r * 0.25)
  // アフリカ大陸風
  drawContinent(ctx, cx - 30 - offset * 0.1, cy + 5, r * 0.2, r * 0.35)
  // 北米大陸風
  drawContinent(ctx, cx - 55 - offset * 0.1, cy - 25, r * 0.3, r * 0.25)
  // 南米大陸風
  drawContinent(ctx, cx - 40 - offset * 0.1, cy + 20, r * 0.15, r * 0.3)
  // ヨーロッパ風
  drawContinent(ctx, cx - 15 - offset * 0.1, cy - 30, r * 0.2, r * 0.12)

  // 雲
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
  const cloudOff = frame * 0.3
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + cloudOff * 0.005
    const cloudX = cx + Math.cos(angle) * r * 0.5
    const cloudY = cy + Math.sin(angle) * r * 0.3
    ctx.beginPath()
    ctx.ellipse(cloudX, cloudY, r * 0.2, r * 0.06, angle * 0.5, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()

  // 光沢（クリップ外）
  ctx.save()
  const shineGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 0, cx, cy, r)
  shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)')
  shineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = shineGrad
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawContinent(ctx, x, y, w, h) {
  ctx.beginPath()
  // 不規則な形状
  ctx.moveTo(x, y - h * 0.3)
  ctx.bezierCurveTo(x + w * 0.6, y - h * 0.5, x + w, y - h * 0.2, x + w * 0.8, y + h * 0.1)
  ctx.bezierCurveTo(x + w * 0.9, y + h * 0.5, x + w * 0.4, y + h * 0.6, x + w * 0.1, y + h * 0.4)
  ctx.bezierCurveTo(x - w * 0.3, y + h * 0.3, x - w * 0.2, y - h * 0.1, x, y - h * 0.3)
  ctx.fill()
}

// 木を描画
function drawTree(ctx, baseX, baseY, treeH, growth) {
  if (growth <= 0) return
  const g = Math.min(growth, 1)
  ctx.save()
  ctx.globalAlpha = g

  const trunkW = treeH * 0.06
  const trunkH = treeH * 0.45 * g

  // 幹（グラデーション）
  const trunkGrad = ctx.createLinearGradient(baseX, baseY, baseX, baseY - trunkH)
  trunkGrad.addColorStop(0, '#3e2723')
  trunkGrad.addColorStop(0.5, '#5d4037')
  trunkGrad.addColorStop(1, '#6d4c41')
  ctx.fillStyle = trunkGrad

  ctx.beginPath()
  ctx.moveTo(baseX - trunkW, baseY)
  ctx.bezierCurveTo(baseX - trunkW * 1.2, baseY - trunkH * 0.4, baseX - trunkW * 0.6, baseY - trunkH * 0.8, baseX - trunkW * 0.3, baseY - trunkH)
  ctx.lineTo(baseX + trunkW * 0.3, baseY - trunkH)
  ctx.bezierCurveTo(baseX + trunkW * 0.6, baseY - trunkH * 0.8, baseX + trunkW * 1.2, baseY - trunkH * 0.4, baseX + trunkW, baseY)
  ctx.fill()

  // 枝
  const branchTop = baseY - trunkH
  ctx.strokeStyle = '#5d4037'
  ctx.lineWidth = 3
  const branches = [
    { angle: -0.6, len: treeH * 0.15, startY: 0.3 },
    { angle: 0.5, len: treeH * 0.18, startY: 0.35 },
    { angle: -0.8, len: treeH * 0.2, startY: 0.55 },
    { angle: 0.7, len: treeH * 0.22, startY: 0.6 },
    { angle: -0.4, len: treeH * 0.16, startY: 0.75 },
    { angle: 0.3, len: treeH * 0.14, startY: 0.8 },
  ]
  for (const b of branches) {
    const sy = baseY - trunkH * b.startY * g
    const ex = baseX + Math.sin(b.angle) * b.len * g
    const ey = sy - Math.cos(b.angle) * b.len * g * 0.5
    ctx.beginPath()
    ctx.moveTo(baseX, sy)
    ctx.quadraticCurveTo(baseX + Math.sin(b.angle) * b.len * 0.5 * g, sy - b.len * 0.3 * g, ex, ey)
    ctx.stroke()
  }

  // 葉の集合体（複数の楕円を重ねる）
  if (g > 0.3) {
    const leafAlpha = Math.min((g - 0.3) / 0.7, 1)
    const canopyY = branchTop - treeH * 0.1
    const canopyR = treeH * 0.28

    const layers = [
      { dx: 0, dy: -canopyR * 0.3, rx: canopyR * 1.1, ry: canopyR * 0.8, color: '#1b5e20' },
      { dx: -canopyR * 0.4, dy: 0, rx: canopyR * 0.7, ry: canopyR * 0.6, color: '#2e7d32' },
      { dx: canopyR * 0.4, dy: 0, rx: canopyR * 0.7, ry: canopyR * 0.6, color: '#2e7d32' },
      { dx: 0, dy: -canopyR * 0.6, rx: canopyR * 0.8, ry: canopyR * 0.6, color: '#388e3c' },
      { dx: -canopyR * 0.2, dy: -canopyR * 0.15, rx: canopyR * 0.9, ry: canopyR * 0.7, color: '#43a047' },
      { dx: canopyR * 0.15, dy: -canopyR * 0.45, rx: canopyR * 0.6, ry: canopyR * 0.5, color: '#4caf50' },
    ]

    for (const l of layers) {
      ctx.globalAlpha = leafAlpha * 0.7
      ctx.fillStyle = l.color
      ctx.beginPath()
      ctx.ellipse(baseX + l.dx, canopyY + l.dy, l.rx, l.ry, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.restore()
}

onMounted(() => {
  // IntersectionObserverでスライドが表示された時に初期化
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !started) {
        started = true
        observer.disconnect()
        nextTick(() => startAnimation())
      }
    }
  }, { threshold: 0.3 })

  if (container.value) observer.observe(container.value)
})

function startAnimation() {
  const cvs = canvas.value
  const cont = container.value
  if (!cvs || !cont) return

  const w = cont.offsetWidth
  const h = cont.offsetHeight
  if (w === 0 || h === 0) return
  cvs.width = w * 2
  cvs.height = h * 2
  cvs.style.width = w + 'px'
  cvs.style.height = h + 'px'
  const ctx = cvs.getContext('2d')
  ctx.scale(2, 2)

  // 星を事前生成
  const stars = []
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8,
      baseAlpha: 0.2 + Math.random() * 0.8,
      twinkleSpeed: 0.01 + Math.random() * 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
    })
  }

  // 宇宙を舞う葉
  const palette = ['#35c98a', '#0f9d58', '#8fe7be', '#4dd99b', '#2ab77a']
  const cosmicLeaves = []
  function spawnLeaf() {
    const earthX = w * 0.5
    const treeTopY = h * 0.25
    const angle = Math.random() * Math.PI * 2
    const speed = 1 + Math.random() * 2.5
    cosmicLeaves.push({
      x: earthX + (Math.random() - 0.5) * 80,
      y: treeTopY + Math.random() * 60,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 12 + Math.random() * 25,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 0.7 + Math.random() * 0.3,
      life: 0,
      maxLife: 200 + Math.random() * 150,
    })
  }

  let frame = 0
  const earthR = Math.min(w, h) * 0.12
  const earthCX = w * 0.5
  const earthCY = h * 0.78
  const treeBaseY = earthCY - earthR * 0.85
  const treeH = h * 0.55

  function animate() {
    frame++
    // 背景
    ctx.fillStyle = '#050d1a'
    ctx.fillRect(0, 0, w, h)

    // 星（瞬き）
    for (const star of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(frame * star.twinkleSpeed + star.twinklePhase)
      ctx.globalAlpha = star.baseAlpha * twinkle
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // 地球
    drawEarth(ctx, earthCX, earthCY, earthR, frame)

    // 木（成長アニメーション）
    const treeGrowth = Math.min(frame / 90, 1)
    drawTree(ctx, earthCX, treeBaseY, treeH, treeGrowth)

    // 葉をスポーン（木が育ったら）
    if (treeGrowth > 0.6 && frame % 4 === 0) {
      spawnLeaf()
    }

    // 宇宙を舞う葉を描画
    for (let i = cosmicLeaves.length - 1; i >= 0; i--) {
      const leaf = cosmicLeaves[i]
      leaf.x += leaf.vx
      leaf.y += leaf.vy
      leaf.rotation += leaf.rotSpeed
      leaf.life++

      // フェードアウト
      let a = leaf.alpha
      if (leaf.life > leaf.maxLife * 0.7) {
        a *= 1 - (leaf.life - leaf.maxLife * 0.7) / (leaf.maxLife * 0.3)
      }

      if (leaf.life > leaf.maxLife) {
        cosmicLeaves.splice(i, 1)
        continue
      }

      drawHeartLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.color, leaf.rotation, Math.max(0, a))
    }

    animId = requestAnimationFrame(animate)
  }

  animate()
  setTimeout(() => { showText.value = true }, 3500)
}

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.cosmos-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #050d1a;
}

.cosmos-canvas {
  position: absolute;
  inset: 0;
}

.cosmos-message {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.cosmos-message h1 {
  font-size: 48px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 0 40px rgba(53, 201, 138, 0.6), 0 0 80px rgba(15, 157, 88, 0.3);
  letter-spacing: 0.1em;
}

.cosmos-text-enter-active {
  transition: opacity 2s ease;
}
.cosmos-text-enter-from {
  opacity: 0;
}
</style>
