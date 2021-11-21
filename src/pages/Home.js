import Movielist from '../components/Movielist';
import Intro from '../components/Intro';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}


const Demo = ({ title }) => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab={`${title = 'Upcoming movies'}`} key="1">
      <Movielist type='upcoming' />
    </TabPane>
    <TabPane tab={`${title = 'Top movies'}`} key="2">
      <Movielist type='top_rated' />
    </TabPane>
    <TabPane tab={`${title = 'Popular movies'}`} key="3">
      <Movielist type='popular' />
    </TabPane>
  </Tabs>
);




const Home = () => {
  return (
    <div className="page-content">
      <Intro />
      <div className='container'>
        <Link className='main__link' to='/catalog'>All</Link>
        <Demo />
      </div>
      <Slider />
    </div>
  );
}

export default Home;