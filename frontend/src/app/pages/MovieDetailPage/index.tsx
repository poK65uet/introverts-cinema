import React from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
	let { movieId } = useParams<{ movieId: string | undefined }>()
	console.log(movieId);

	return (
		<div>{movieId}</div>
	)
}
