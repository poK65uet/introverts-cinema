import useStyles from './styles';
import Banner from 'app/components/Banner';
import NewMovieList from 'app/components/NewMovieList';
import UpcomingMovieList from 'app/components/UpcomingMovieList';

export function HomePage() {

  const classes = useStyles();

  return (
    <div className={classes.homePage} >
      <Banner />
      <NewMovieList />
      <UpcomingMovieList />
    </div>
  );
}
