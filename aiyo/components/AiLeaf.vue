<template>
  <svg :width="size" :height="size" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- ハート型の葉 -->
    <defs>
      <clipPath id="leaf-clip">
        <path :d="heartPath" />
      </clipPath>
      <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :stop-color="colorLight" />
        <stop offset="100%" :stop-color="colorDark" />
      </linearGradient>
    </defs>
    <!-- 葉本体 -->
    <path :d="heartPath" fill="url(#leaf-grad)" :opacity="opacity" />
    <!-- AI回路模様（葉脈） -->
    <g clip-path="url(#leaf-clip)" :opacity="opacity * 0.5" stroke="#ffffff" stroke-width="0.8" fill="none">
      <!-- 中央脈 -->
      <line x1="50" y1="25" x2="50" y2="85" />
      <!-- 左側の回路パターン -->
      <polyline points="50,35 35,30 25,38" />
      <polyline points="50,48 30,45 20,55" />
      <polyline points="50,60 35,62 28,72" />
      <!-- 右側の回路パターン -->
      <polyline points="50,35 65,30 75,38" />
      <polyline points="50,48 70,45 80,55" />
      <polyline points="50,60 65,62 72,72" />
      <!-- ノード（ニューロン風の点） -->
      <circle cx="35" cy="30" r="2" fill="#ffffff" />
      <circle cx="25" cy="38" r="1.5" fill="#ffffff" />
      <circle cx="30" cy="45" r="2" fill="#ffffff" />
      <circle cx="20" cy="55" r="1.5" fill="#ffffff" />
      <circle cx="35" cy="62" r="2" fill="#ffffff" />
      <circle cx="65" cy="30" r="2" fill="#ffffff" />
      <circle cx="75" cy="38" r="1.5" fill="#ffffff" />
      <circle cx="70" cy="45" r="2" fill="#ffffff" />
      <circle cx="80" cy="55" r="1.5" fill="#ffffff" />
      <circle cx="65" cy="62" r="2" fill="#ffffff" />
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 60 },
  opacity: { type: Number, default: 0.85 },
  colorLight: { type: String, default: '#35c98a' },
  colorDark: { type: String, default: '#0b6e3d' },
})

const heartPath = 'M50 85 C50 85 15 60 15 38 C15 20 30 15 50 30 C70 15 85 20 85 38 C85 60 50 85 50 85Z'
</script>
