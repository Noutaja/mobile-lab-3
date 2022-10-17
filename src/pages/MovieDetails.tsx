import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface MovieDetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}



const MovieDetails: React.FC<MovieDetailsPageProps> = ({match}) => {
	const apiUrl = "https://www.omdbapi.com/?apikey=24c608e2&i="
	
	const getMovieDetails = () =>{
		const url = apiUrl + match.params.id;
		console.log(url);

	}
	return (
	  <IonPage>
		<IonHeader>
		  <IonToolbar>
			<IonTitle></IonTitle>
		  </IonToolbar>
		</IonHeader>
		<IonContent fullscreen>
		  <IonHeader collapse="condense">
			<IonToolbar>
			  <IonTitle size="large">Blank</IonTitle>
			</IonToolbar>
		  </IonHeader>
		</IonContent>
	  </IonPage>
	);
  };
  
  export default MovieDetails;