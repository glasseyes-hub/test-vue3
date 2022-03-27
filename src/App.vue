<template>
  <v-app>
    <v-main>
      <div class="container">
        <Search v-model="searchString" />
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="blue"
        ></v-progress-circular>
        <Suspense>
          <div class="posts">
            <Post
              v-for="post of showPosts"
              :key="post.id"
              :title="post.title"
              :body="post.body"
              :author="post.author.name"
            />
          </div>
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
    const posts = await this.useFetch(
      `http://jsonplaceholder.typicode.com/posts?_limit=${this.limit}`
    );

    this.posts = await Promise.all(
      posts.map(async ({ id, title, body, userId }) => {
        const author = await this.useFetch(
          `http://jsonplaceholder.typicode.com/users/${userId}`
        );

        return {
          id,
          title,
          body,
          author,
        };
      })
    );

    this.loading = false;
  },
};
</script>

<style lang="sass">
@import '@/styles/main.scss'

$contant-gap: 25px
$post-gap: 20px

*
  padding: 0
  marign: 0

body
  background-color: $background-color

.container
  display: flex
  background-color: $background-color
  flex-direction: column
  align-items: center
  gap: $contant-gap
  margin: 0 auto
  padding: $contant-gap 0

@media screen
  .posts
    columns: 3
    column-gap: $post-gap
    & > *
      margin-bottom: $post-gap
    @media (max-width: 1340px)
      columns: 2
    @media (max-width: 900px)
      columns: 1
</style>
