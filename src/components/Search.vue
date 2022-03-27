<template>
  <div class="search" :class="{ search__focused: focused }">
    <v-icon large class="icon">mdi-magnify</v-icon>
    <input
      class="input"
      type="text"
      :value="modelValue"
      @input="onInput"
      @focus="focused = true"
      @focusout="focused = false"
      placeholder="Filter by author..."
    />
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="sass">
@import '@/styles/main.scss'

$height: 40px


@media screen
  .search
    display: flex
    align-items: center
    background-color: #fff
    width: 400px
    border-radius: $border-radius
    border: $border
    transition: $transition
    &.search__focused,
    &.search__focused > .icon
      border-color: $border-color__hover
    @media (max-width: 400px)
      width: 100%

    .icon
      padding: 20px 22px
      border-right: $border
      transition: $transition
      &:before
        color: #8c939a
        font-size: 27px !important

    .input
      height: $height
      width: 400px
      font-size: 18px
      padding: 0 12px
      color: #a4a7a9
      font-weight: bold
      &::placeholder
        color: #a4a7a9
      &:focus
        outline: none
</style>
