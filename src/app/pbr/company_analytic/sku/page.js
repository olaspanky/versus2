"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout2 from '@/app/shared/Layout2';
import Performance from '../../../components/market/Market';
import withAuth from '@/app/utilities/withAuth';

const Home = () => {



  return (
      <Layout2>
        <Performance />
      </Layout2>
  );
};

export default withAuth(Home)
