import ChelseaComponent from './chelsea';
import JokoComponent from './joko';
import UjangComponent from './ujang';
import {Link} from 'tdesign-react';

export default function LandingPage() {
    return (
        <div>
            <ul>
                <li><Link theme="primary" href={"/auth/login"}>Login</Link></li>
                <li><Link theme="primary" href={"/home"}>Home</Link></li>
                <li><Link theme="primary" href={"/classes"}>Kelas</Link></li>
            </ul>
            <br/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            fugiat nam sit vero necessitatibus unde pariatur ex nemo, accusantium vel
            ipsum. Fugiat ipsum quasi explicabo est nisi voluptatum velit ex.
            <UjangComponent/>
            <JokoComponent/>
            <ChelseaComponent/>
        </div>
    );
}
