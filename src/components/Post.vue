<script>
export default {
  props: ["title", "body", "author"],
};
</script>

<template>
  <div class="post">
    <h3 class="post-title">{{ title }}</h3>
    <p class="post-body">{{ body }}</p>
    <span class="post-author">{{ author }}</span>
  </div>
</template>

<style lang="sass">
@import '@/styles/main.scss'


@media screen
  .post
    display: flex
    flex-direction: column
    gap: 15px
    background-color: #fff
    width: 410px
    border: $border
    border-radius: $border-radius
    padding: 20px
    break-inside: avoid
    transition: $transition
    font-weight: bold
    &:hover
      border-color: $border-color__hover
    @media (max-width: 410px)
      width: 100%

    &-title
      font-size: 22px
      line-height: 28px
      color: #408ae1
      &::first-letter
        text-transform: uppercase

    &-body
      font-size: 19px
      line-height: 27px
      color: #48494b
      &::first-letter
        text-transform: uppercase

    &-author
      padding-top: 10px
      font-size: 14px
      color: #aeaeae
</style>
