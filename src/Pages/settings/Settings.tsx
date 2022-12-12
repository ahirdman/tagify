import './Settings.scss';
import { Button } from '../../Components/atoms';
import { FirebaseAuth } from '../../services';
import { useAppSelector } from '../../store/hooks';
import Edit from '../../common/svg/Edit';
import Card from '../../Layout/Card/Card';

interface ISettingRow {
  description: string;
  status: string;
  edit: () => void;
}

interface IProps {
  header: string;
  sections: ISettingRow[];
  children?: JSX.Element[] | JSX.Element;
}

export const Setting = ({ header, sections, children }: IProps) => {
  const rows = sections.map((section, index) => (
    <div className="setting__row" key={index}>
      <div>
        <p className="setting__row--description">{section.description}</p>
        <p className="setting__row--status">{section.status}</p>
      </div>

      <button className="setting__row--edit" onClick={section.edit}>
        <Edit />
      </button>
    </div>
  ));

  return (
    <li className="setting">
      <div className="setting__header">
        <p>{header}</p>
      </div>
      {rows}
      {children}
    </li>
  );
};

const Settings = () => {
  const user = useAppSelector(state => state.user);

  const moodify: ISettingRow[] = [
    {
      description: 'Subscription',
      status: 'Trial',
      edit() {
        console.log('first');
      },
    },
    {
      description: 'Email',
      status: user.mail,
      edit() {
        console.log('first');
      },
    },
    {
      description: 'Password',
      status: '*********',
      edit() {
        console.log('first');
      },
    },
  ];

  const spotify: ISettingRow[] = [
    {
      description: 'Connection',
      status: user.spotify.connected ? 'Connected' : 'Disconnected',
      edit() {
        console.log('first');
      },
    },
  ];

  return (
    <Card title="Settings" navigate={false}>
      <ul className="settings">
        <Setting header="Spotify" sections={spotify} />
        <Setting header="Moodify" sections={moodify}>
          <Button
            width="100%"
            title="Delete Account"
            backgroundColor="#150000"
            textColor="#cd3e3e"
            border="1px solid #e43131"
            onClick={() => console.log('no')}
          />
        </Setting>
        <Button
          width="100%"
          title="Sign Out"
          textColor="white"
          backgroundColor="black"
          onClick={() => FirebaseAuth.logOut()}
        />
      </ul>
    </Card>
  );
};

export default Settings;
