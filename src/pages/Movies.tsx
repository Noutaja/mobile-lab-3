import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Movies.css';
import { bookOutline } from 'ionicons/icons';

type MovieItem = {
	Title: string;
	Poster: string;
	Type: string;
	Year: string;
	imdbID: string;
}

const SearchResults: React.FC<{movielist: MovieItem[]}> = (props) => {
	
	return (
		props.movielist.length ?< IonItem>
			<IonList>
				{props.movielist.map((item) => (
					<IonItem key={item.imdbID} className="movie-item">
						<IonThumbnail slot="start">
							<img alt="Movie poster" src={item.Poster}></img>
						</IonThumbnail>
						{item.Title}
						<IonButton slot="end" routerLink={"/moviedetails/" + item.imdbID}><IonIcon icon={bookOutline}></IonIcon></IonButton>
					</IonItem>
				))}
			</IonList>
		</IonItem> : null);
}

const Movies: React.FC = () => {
	const apiUrl = "http://www.omdbapi.com/?apikey=24c608e2&s=";

	const [searchInput, setSearchInput] = useState<string>();
	const [movielist, setMovielist] = useState<MovieItem[]>([]);

	const searchMovies = async () => {
		const url = apiUrl + searchInput;

		await fetch(url)
		.then(res => res.json())
		.then(data => {
			setMovielist(data.Search);
		});
	}

	const handleInput = (event: any) => {
		setSearchInput(event.target.value);
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Movie Search</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonLabel>Title:</IonLabel>
					<IonInput placeholder="Enter text" type="text" value={searchInput} onIonChange={handleInput}></IonInput>
					<IonButton onClick={searchMovies}>Search</IonButton>
				</IonItem>
				<SearchResults movielist={movielist} />
			</IonContent>
		</IonPage>
	);
};

export default Movies;
