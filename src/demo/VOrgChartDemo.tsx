import React from 'react';
import { VOrgChart } from '../components/VOrgChart';

const dataSource = {
  name: 'Hierarchy',
  title: 'Vertrax',
  id: 'root',
  children: [
    { name: 'LaTank', title: 'Company', className: 'Company', id: 1 },
    {
      name: 'LaTank2',
      title: 'Company',
      className: 'Company',
      id: 2,
      children: [
        {
          name: 'Los Angeles Mx',
          title: 'Terminal',
          className: 'Terminal',
          id: 7
        },
        {
          name: 'California',
          title: 'Terminal',
          className: 'Terminal',
          id: 8
        }
      ]
    },
    { name: 'La Tank 3', title: 'Company', className: 'Company', id: 3 },
    {
      name: 'La Tank 4',
      title: 'Company',
      className: 'Company',
      id: 4,
      children: [
        { name: 'Texas', title: 'Terminal', className: 'Terminal', id: 9 },
        { name: 'Austin', title: 'Terminal', className: 'Terminal', id: 10 }
      ]
    }
  ]
};

export const VOrgChartDemo = () => {

  const onReorderHierarchy = (data: any) => {
    console.log(data);
  };

  const onClickCompany = (data: any) => {
    console.log(data);
  };

  return (
    <VOrgChart
      dataSource={dataSource}
      onReorder={onReorderHierarchy}
      onClick={onClickCompany}
      draggable={true}
    />
  )
}