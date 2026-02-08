<template>
    <section class="notFoundViewSection">
        <div class="container">
            <Chip label="404" />
            <div class="content">
                <h2>Page Not Found</h2>
                <p class="regular">Sorry, we couldn’t find the page.</p>
            </div>
            <Button class="cta" label="Go to Dashboard" icon="pi pi-home" @click="goToDashboard" severity="primary"
                rounded />
        </div>
        <div class="image">
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDashboard = () => {
    router.push({ name: 'home' });
};
</script>