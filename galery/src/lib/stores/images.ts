import { writable } from 'svelte/store';
import type { Image } from '$lib/api/getImages';

export const images = writable<Image[]>([]);