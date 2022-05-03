<template>
  <v-card class="mx-auto">
    <v-navigation-drawer>
      <v-list v-model="model">
        <v-list-item-group>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <div class="pa-4">
        <v-btn outlined block> Logout </v-btn>
      </div>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { routes } from "../routes";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-variant", to: "/home" },
        { title: "Shorts", icon: "mdi-video", to: "/shorts" },
        {
          title: "Follows",
          icon: "mdi-youtube-subscription",
          to: "/feed/follows",
        },
        { title: "History", icon: "mdi-history", to: "/feed/history" },
      ],
      routes,
      model: "1",
    };
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
  },
};
</script>