import ChelseaComponent from './chelsea';
import JokoComponent from './joko';
import UjangComponent from './ujang';

export default function LandingPage() {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
      fugiat nam sit vero necessitatibus unde pariatur ex nemo, accusantium vel
      ipsum. Fugiat ipsum quasi explicabo est nisi voluptatum velit ex.
      <UjangComponent />
      <JokoComponent />
      <ChelseaComponent />
    </div>
  );
}
