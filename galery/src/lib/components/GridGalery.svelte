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

    .carousel .slide {
        display: none;
        text-align: center;
        margin: 50px;
    }

    .carousel .slide.active {
        display: block;
    }

    .carousel img {
        width: 50%;
        border: 1px solid black;
        box-shadow:  2px 0 10px rgba(244, 243, 246, 0.678);
    }
.image-name {
        margin-top: 10px;
        font-size: 1.5em;
        color: var(--link-color);
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
        width: 10%;
        background-color: rgba(155, 150, 227, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        border-radius: 10px;
        
    }
    .carousel-buttons button:hover {
        background-color: rgba(155, 150, 227, 0.8);
    }
</style>

<main>
    <div class="carousel">
        {#if $images.length > 0}
            {#each $images as image, index}
                <div class="slide {index === currentIndex ? 'active' : ''}">
                    <a href={image.profile_url} target="_blank">
                        <img src={image.image_url} alt={image.name}>
                    </a>
                    <p class="image-name">{image.name}</p>
                    <a class="image-profile" href="{image.profile_url}" target="_blank">Consulter le profil</a>
                </div>
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