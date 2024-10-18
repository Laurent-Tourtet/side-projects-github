export interface Image {
    id: string;
    url: string;
    title: string;
    // Ajoutez d'autres propriétés selon vos besoins
}

export async function getImages(): Promise<Image[]> {
    try {
        const response = await fetch('https://api.example.com/images');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des images');
        }
        const data = await response.json();
        return data.images as Image[]; // Assurez-vous que la structure des données correspond à ce que vous attendez
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}