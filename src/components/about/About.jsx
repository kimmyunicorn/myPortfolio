import Reveal from '../ui/Reveal.jsx';
import { Sparkle } from '../sakura/Sakura.jsx';
import IdCard from './IdCard.jsx';
import './about.css';

// Copy is written in Kimberly's voice from the background she provided — edit freely.
const lab = [
  'Robotics',
  'Computer vision',
  'Artificial intelligence',
  'Autonomous systems',
  'Embedded systems',
  'Software engineering',
  'Human–robot interaction',
  'Aerospace and space robotics',
];
const life = ['Acting', 'Singing', 'Guitar', 'Piano', 'Making videos', 'Storytelling', 'Travel', 'Content creation'];

const education = [
  {
    school: 'New York University',
    detail: 'Master’s in Mechatronics and Robotics',
    status: 'In progress',
  },
  {
    school: 'University of California, Santa Cruz',
    detail: 'Robotics Engineering and Computer Engineering, minor in Electrical Engineering',
    status: 'Undergraduate',
  },
];

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__lead">
          <h2 id="about-title" className="visually-hidden">
            About me
          </h2>
          <Reveal as="p" className="about__statement">
            I like the moment code leaves the screen and starts moving something real.
          </Reveal>
          <Reveal delay={120}>
            <IdCard />
          </Reveal>
        </div>

        <div className="about__body">
          <Reveal as="p">
            I’m Kimberly, a robotics and software engineer in New York. I studied Robotics Engineering and Computer
            Engineering at UC Santa Cruz, with a minor in Electrical Engineering, and I’m now working toward a
            Master’s in Mechatronics and Robotics at NYU.
          </Reveal>
          <Reveal as="p" delay={80}>
            Most of my work sits where software meets hardware: autonomous robots, an underwater ROV, machine learning
            pipelines, real-time interfaces and embedded control. What draws me in most is perception, the part of a
            robot that lets it understand its surroundings, reason about them and act. Long term, I want to bring that
            work into advanced robotics and aerospace.
          </Reveal>
          <Reveal as="p" delay={160}>
            I also have a big creative side. I act, sing, play guitar and piano, make videos and travel whenever I can.
            Building a robot and putting on a performance feel like the same instinct to me: make something, try it,
            refine it, and bring it to life in front of people. I’m happiest on projects that are a little too
            ambitious.
          </Reveal>

          <dl className="about__edu">
            {education.map((e) => (
              <div key={e.school}>
                <dt>{e.school}</dt>
                <dd>
                  {e.detail}
                  <span>{e.status}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="wrap about__worlds">
        <Reveal className="about__world">
          <h3>In the lab</h3>
          <ul>
            {lab.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
        <div className="about__divider" aria-hidden="true">
          <span />
          <Sparkle size={30} tone="pink" className="twinkle" />
          <span />
        </div>
        <Reveal className="about__world about__world--life" delay={120}>
          <h3>Off the clock</h3>
          <ul>
            {life.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <p className="wrap about__ps">
        p.s. I also actually really want to be an actress, so if you have any connections, please let me know. I’d
        love to audition! :)
      </p>
    </section>
  );
}
