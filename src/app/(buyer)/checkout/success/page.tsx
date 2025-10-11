'use client';
import Notification from '@/components/container/notification';
import { NOTIFICATION } from '@/constants/notification';
import React from 'react';

const SuccessPage = () => {
  return <Notification {...NOTIFICATION.CHECKOUT_SUCCESS} />;
};

export default SuccessPage;
