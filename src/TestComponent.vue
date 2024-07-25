<script lang="ts" setup>
import {useShowPetById} from "./api/pets/pets";

const {data: pet, error: petError} = useShowPetById("100");
</script>
<template>
  <div v-if="petError">{{petError}}</div>
  <div v-else>{{pet}}</div>
</template>