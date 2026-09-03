<template>
  <div class="overlay-demo-grid">
    <article class="spec-card">
      <div class="demo-label">Component Anchor · v-sjf-overlay-anchor</div>
      <p class="overlay-demo-copy">滚动下面的容器，悬浮面板会跟随按钮重新定位；空间不足时自动 flip。</p>

      <div class="overlay-scroll-box">
        <div class="overlay-scroll-spacer">向下滚动</div>
        <button
          v-sjf-overlay-anchor="anchorBinding"
          class="secondary-action overlay-anchor-button"
          type="button"
          @click="toggleAnchorPanel"
        >
          {{ anchorOpen ? '关闭锚点面板' : '打开锚点面板' }}
        </button>
        <div class="overlay-scroll-spacer overlay-scroll-spacer--bottom">继续滚动测试 flip</div>
      </div>
    </article>

    <article class="spec-card">
      <div class="demo-label">Mouse Anchor · ContextMenu style</div>
      <p class="overlay-demo-copy">在区域内右键。鼠标点本身就是 anchor，不需要伪造 DOM。</p>

      <div class="overlay-context-area" @contextmenu.prevent="openContextMenu">
        <strong>在这里右键</strong>
        <span>{{ contextPointText }}</span>
      </div>
    </article>

    <Teleport v-if="overlayMount" :to="overlayMount">
      <div
        v-if="anchorOpen"
        ref="anchorPanelRef"
        class="sjf-overlay-demo-panel"
        role="dialog"
      >
        <strong>Anchored Panel</strong>
        <span>placement: {{ anchorPlacement }}</span>
        <span>滚动 / resize 会自动重新计算</span>
      </div>

      <div
        v-if="contextOpen"
        ref="contextPanelRef"
        class="sjf-overlay-demo-panel sjf-overlay-demo-panel--menu"
        role="menu"
      >
        <button type="button" @click="contextOpen = false">打开</button>
        <button type="button" @click="contextOpen = false">复制</button>
        <button type="button" @click="contextOpen = false">关闭</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup vapor lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import SJFUI from '@/sjfui'
import vSjfOverlayAnchor, {
  type SjfOverlayAnchorDirectiveValue,
} from '@/directives/overlayAnchor'
import {
  applySjfOverlayPosition,
  autoUpdateSjfOverlay,
  computeSjfOverlayPosition,
  createSjfPointAnchor,
  type SjfOverlayPlacement,
  type SjfOverlayPointAnchor,
} from '@/core/overlay'

const overlayMount = ref<HTMLElement | null>(null)
const anchorPanelRef = ref<HTMLElement | null>(null)
const contextPanelRef = ref<HTMLElement | null>(null)
const anchorOpen = ref(false)
const contextOpen = ref(false)
const anchorPlacement = ref<SjfOverlayPlacement>('bottom-start')
const contextPoint = ref<SjfOverlayPointAnchor>(createSjfPointAnchor(0, 0))
let stopContextAutoUpdate: (() => void) | null = null

const anchorBinding = computed<SjfOverlayAnchorDirectiveValue>(() => ({
  enabled: anchorOpen.value,
  panel: () => anchorPanelRef.value,
  options: {
    placement: 'bottom-start',
    matchWidth: true,
    flip: true,
    shift: true,
  },
  onUpdate: (result) => {
    anchorPlacement.value = result.placement
  },
}))

const contextPointText = computed(() =>
  contextOpen.value
    ? `x: ${Math.round(contextPoint.value.x)}, y: ${Math.round(contextPoint.value.y)}`
    : '等待右键坐标',
)

onMounted(() => {
  overlayMount.value = SJFUI.getOverlayMount()
})

onBeforeUnmount(() => {
  stopContextAutoUpdate?.()
})

function toggleAnchorPanel(): void {
  anchorOpen.value = !anchorOpen.value
  overlayMount.value = SJFUI.getOverlayMount()
}

async function openContextMenu(event: MouseEvent): Promise<void> {
  contextPoint.value = createSjfPointAnchor(event.clientX, event.clientY)
  contextOpen.value = true
  overlayMount.value = SJFUI.getOverlayMount()

  await nextTick()
  stopContextAutoUpdate?.()
  stopContextAutoUpdate = autoUpdateSjfOverlay(
    () => contextPoint.value,
    () => contextPanelRef.value,
    updateContextPosition,
  )
}

function updateContextPosition(): void {
  if (!contextOpen.value) return
  const panel = contextPanelRef.value
  if (!panel) return

  const result = computeSjfOverlayPosition(
    contextPoint.value,
    panel,
    {
      placement: 'bottom-start',
      offset: 4,
      flip: true,
      shift: true,
    },
  )
  applySjfOverlayPosition(panel, result)
}
</script>

<style scoped>
.overlay-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sjf-gap-nm);
}

.overlay-demo-copy {
  margin: 8px 0 14px;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 13px;
  line-height: 1.6;
}

.overlay-scroll-box {
  height: 220px;
  overflow: auto;
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-rd-nm);
  padding: var(--sjf-pd-sm);
  background: var(--md-sys-color-surface-container-low);
}

.overlay-scroll-spacer {
  height: 150px;
  display: grid;
  place-items: center;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 12px;
}

.overlay-scroll-spacer--bottom {
  height: 180px;
}

.overlay-anchor-button {
  width: 100%;
  border: 1px solid var(--md-sys-color-outline-variant);
  cursor: pointer;
}

.overlay-context-area {
  min-height: 220px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  border: 1px dashed var(--md-sys-color-outline);
  border-radius: var(--sjf-rd-nm);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  cursor: context-menu;
  user-select: none;
}

.overlay-context-area span {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 12px;
}

@media (max-width: 820px) {
  .overlay-demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
.sjf-overlay-demo-panel {
  width: max-content;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-rd-nm);
  padding: var(--sjf-pd-sm);
  background: var(--md-sys-color-surface-container-lowest);
  color: var(--md-sys-color-on-surface);
  box-shadow: var(--sjf-shadow-md);
  pointer-events: auto;
  z-index: 1;
  overflow: auto;
}

.sjf-overlay-demo-panel span {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 12px;
}

.sjf-overlay-demo-panel--menu {
  min-width: 150px;
  gap: 2px;
  padding: 6px;
}

.sjf-overlay-demo-panel--menu button {
  width: 100%;
  border: 0;
  border-radius: var(--sjf-rd-sm);
  padding: 8px 10px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.sjf-overlay-demo-panel--menu button:hover,
.sjf-overlay-demo-panel--menu button:focus-visible {
  background: var(--md-sys-color-surface-container-high);
}
</style>
