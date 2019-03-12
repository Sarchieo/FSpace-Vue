<template>
 <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type='home'></f-space-header>
    </a-layout>
 </div>  
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header/header";
export default {
  components: {
    FSpaceHeader
  },
  middleware: 'authenticated'
}
</script>
<style>

</style>


