<script lang="ts">
    import { onMount } from 'svelte';
    import type { Image } from '$lib/api/getImages'; // Importez le type Image

    let images;
    let getImages;

    onMount(async () => {
        const module = await import('$lib/api/getImages');
        getImages = module.getImages;

        const storeModule = await import('$lib/stores/images');
        images = storeModule.images;

        const fetchedImages: Image[] = await getImages(); // Utilisez le type Image ici
        images.set(fetchedImages);
    });
</script>


