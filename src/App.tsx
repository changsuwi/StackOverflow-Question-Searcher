import Questions from './components/Questions';
import SearchBar from './components/SearchBar';
import TagsList from './components/Tags';

function App() {

  return (
    <div className="max-w-5xl mx-auto px-8 laptop:px-4">
        <SearchBar />
        <TagsList />
        <Questions/>
    </div>
  );
}

export default App;
