<script lang="ts">
    import { onMount } from 'svelte';
    import type { Image } from '$lib/api/getImages'; // Importez le type Image
    import { writable, type Writable } from 'svelte/store';

    let images: Writable<Image[]> = writable([]); // Typage explicite de la variable images
    let getImages: () => Promise<Image[]>;

    onMount(async () => {
        const module = await import('$lib/api/getImages');
        getImages = module.getImages;

        const fetchedImages: Image[] = await getImages(); // Utilisez le type Image ici
        images.set(fetchedImages);
    });

    let currentIndex = 0;

    function nextImage() {
        currentIndex = (currentIndex + 1) % $images.length;
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + $images.length) % $images.length;
    }
</script>

<style>
    .carousel {
        position: relative;
        width: 100%;
        max-width: 600px;
        margin: auto;
        overflow: hidden;
    }

    .carousel img {
        width: 100%;
        display: none;
    }

    .carousel img.active {
        display: block;
    }

    .carousel-buttons {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
    }

    .carousel-buttons button {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
    }
</style>

<main>
    <div class="carousel">
        {#if $images.length > 0}
            {#each $images as image, index}
                <a href={image.profile_url} target="_blank">
                    <img src={image.image_url} alt={image.name} class={index === currentIndex ? 'active' : ''}>
                </a>
            {/each}
            <div class="carousel-buttons">
                <button on:click={prevImage}>&lt;</button>
                <button on:click={nextImage}>&gt;</button>
            </div>
        {:else}
            <p>Chargement des images...</p>
        {/if}
    </div>
</main>