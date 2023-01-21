import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='139' cy='129' r='120' />
    <rect x='21' y='278' rx='7' ry='7' width='240' height='32' />
    <rect x='21' y='335' rx='7' ry='7' width='240' height='87' />
    <rect x='21' y='449' rx='7' ry='7' width='95' height='30' />
    <rect x='140' y='440' rx='25' ry='25' width='120' height='42' />
  </ContentLoader>
);

export default Skeleton;
