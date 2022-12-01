interface FilmPayload {
	title: string;
	imageUrl?: string;
	trailerUrl?: string;
	duration?: number;
	openingDay?: Date;
	description?: string;
	rated?: string;
	status?: string;
	nationality: number;
	categories?: number[];
	actors?: number[];
	directors?: number[];
}

export default FilmPayload;
