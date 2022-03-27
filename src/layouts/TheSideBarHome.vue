<template>
  <v-card class="mx-auto">
    <v-navigation-drawer>
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
            :aria-selectetable="true"
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
        { title: "Home", icon: "mdi-view-dashboard", to: "/" },
        { title: "Shorts", icon: "mdi-account-box", to: "/shorts" },
        { title: "Follows", icon: "mdi-gavel", to: "/feed/follows" },
        { title: "History", icon: "mdi-gavel", to: "/feed/history" },
      ],
      routes,
    };
  },
};
</script>