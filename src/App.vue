<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible theme="light">
      <div class="logo" />
      <a-menu theme="light" mode="inline"
        v-model="selectedItem" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="upload" />
          <span>Upload</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="database" />
          <span>Library</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '500px' }">
        <upload v-show="selectedItem[0] === '1'" />
        <library v-show="selectedItem[0] === '2'" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import upload from './views/upload.vue'
import library from './views/library.vue'
export default {
  data () {
    return {
      collapsed: false,
      selectedItem: ['1']
    }
  },
  methods: {
  },
  components: {
    upload,
    library
  }
}
</script>

<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
  }
</style>
