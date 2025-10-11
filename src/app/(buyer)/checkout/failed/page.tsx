'use client';
import Notification from '@/components/container/notification';
import { NOTIFICATION } from '@/constants/notification';
import React from 'react';

const FailedPage = () => {
  return <Notification {...NOTIFICATION.CHECKOUT_FAILED} />;
};

export default FailedPage;
