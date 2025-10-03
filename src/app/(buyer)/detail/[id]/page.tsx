import SectionWrapper from '@/components/container/section-wrapper';
import React from 'react';

const Detail = ({ params }: { params: { id: string } }) => {
  return <SectionWrapper>Detail {params.id}</SectionWrapper>;
};

export default Detail;
