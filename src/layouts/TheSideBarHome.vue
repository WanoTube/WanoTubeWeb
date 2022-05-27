<template>
  <v-card class="mx-auto">
    <v-navigation-drawer permanent>
      <v-list v-model="model">
        <v-list-item-group>
          <v-list-item
            v-for="item in filteredMenuItems"
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
  props: ["menuItems"],
  data() {
    return {
      routes,
      model: "1",
      isAuthenticated: false,
    };
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
    filteredMenuItems() {
      if (this.isAuthenticated) return this.menuItems;
      return this.menuItems.filter((item, index) => !item.requireAuth);
    },
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("user");
  },
};
</script>