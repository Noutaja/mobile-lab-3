import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';

/* interface MovieDetailsPageProps
  extends RouteComponentProps<{
	id: string;
  }> {} */

type MovieID = { id: string };

type Movie = {
	Title: string;
	Year: string;
	Genre: string;
	Poster: string;
	Metascore: string;
	Plot: string;
}

const MovieDetails: React.FC<RouteComponentProps<MovieID>> = ({ match }) => {
	const apiUrl = "https://www.omdbapi.com/?apikey=24c608e2&plot=full&i="
	const [movie, setMovie] = useState<Movie>();

	const getMovieDetails = async () => {
		if (!movie) {
			const url = apiUrl + match.params.id;
			await fetch(url)
				.then(res => res.json())
				.then(data => {
					setMovie(data);
					console.log("fetch");
				});
		}

	}

	getMovieDetails();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>
					<IonTitle>{movie ? "Details" : "Loading"}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{movie ?
					<IonGrid>
						<IonRow>
							<IonCol><IonImg src={movie.Poster}></IonImg></IonCol>
							<IonCol>
								<IonList>
									<IonItem>{movie.Title}</IonItem>
									<IonItem>{movie.Year}</IonItem>
									<IonItem>{movie.Genre}</IonItem>
									<IonItem>{"Score: " + movie.Metascore}</IonItem>
								</IonList>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonItem>{movie.Plot}</IonItem>
							</IonCol>
						</IonRow>
					</IonGrid>
					: null}
			</IonContent>
		</IonPage>
	);
};



/* useEffect(() => {
	const fetchData = async () => {
		const url = apiUrl + match.params.id;
	  const x = await fetch(url)
		.then((res) => res.json())
		.then((x) => x);
	  setMovie(x);
	};

	fetchData();
  }, [movie]); */


export default MovieDetails;