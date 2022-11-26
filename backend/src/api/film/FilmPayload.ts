interface FilmPayload {
	title: string;
	imageUrl?: string;
	trailerUrl?: string;
	duration?: number;
	openingDay?: Date;
	description?: string;
	rated?: string;
	status?: string;
	Nationality: number;
	Categories?: number[];
	Actors?: number[];
	Directors?: number[];
}

export default FilmPayload;
