export interface Image {
    name: string;
    profile_url: string;
    image_url: string;
}

export async function getImages(): Promise<Image[]> {
    try {
        const response = await fetch('/imagesOm.json'); // Chemin mis à jour
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des images');
        }
        const data: Image[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}