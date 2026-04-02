<template>
  <div class="page-number">
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
  </div>
</template>

<style scoped>
.page-number {
  position: fixed;
  right: 24px;
  bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.35);
  z-index: 100;
}
</style>
