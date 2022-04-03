<template>
  <v-app>
    <v-main>
      <v-alert v-if="error" @click="error = false" type="error">{{
        errorMessage
      }}</v-alert>
      <div class="container">
        <Search v-model="searchString" />
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="blue"
        ></v-progress-circular>
        <Suspense>
          <transition-group tag="div" class="posts" name="posts">
            <Post
              v-for="post of showPosts"
              :key="post.id"
              :title="post.title"
              :body="post.body"
              :author="post.author.name"
            />
          </transition-group>
        </Suspense>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Post from "./components/Post.vue";
import Search from "./components/Search.vue";
import useFetch from "./hooks/fetch";

export default {
  name: "App",
  components: {
    Search,
    Post,
  },
  mixins: [useFetch],
  data: () => ({
    limit: 30,
    posts: [],
    searchString: "",
    loading: true,
    error: false,
    errorMessage: "",
  }),
  computed: {
    showPosts() {
      if (this.searchString === "") return this.posts;

      return this.posts.filter((post) =>
        post.author.name.toLowerCase().includes(this.searchString.toLowerCase())
      );
    },
  },
  async mounted() {
    try {
      const posts = await this.useFetch(
        `http://jsonplaceholder.typicode.com/posts?_limit=${this.limit}`
      );

      this.posts = await Promise.all(
        posts.map(async ({ id, title, body, userId }) => {
          const author = await this.useFetch(
            `http://jsonplaceholder.typicode.com/users/${userId}`,
            { cache: "v1-authors" }
          );

          return {
            id,
            title,
            body,
            author,
          };
        })
      );
    } catch (e) {
      this.error = true;
      this.errorMessage = e;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="sass">
@import '@/styles/main.scss'

$content-gap: 25px
$post-gap: 20px

.container
  display: flex
  flex-direction: column
  min-height: 100vh
  align-items: center
  gap: $content-gap
  margin: 0 auto
  padding: $content-gap 0

@media screen
  .posts
    column-gap: $post-gap
    columns: 3
    @media (max-width: 1340px)
      columns: 2
    @media (max-width: 900px)
      columns: 1
    & > *
      margin-bottom: $post-gap

    &-enter-active,
    &-leave-active
      transition: all 0.5s ease-out

    &-enter-from,
    &-leave-to
      opacity: 0
</style>
