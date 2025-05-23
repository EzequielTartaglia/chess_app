'use client'

import { useEffect } from 'react';

const PushNotificationManager = () => {
  useEffect(() => {
    // Verificar que estamos en el entorno del navegador
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'Notification' in window) {
      // Solicitar permiso para las notificaciones
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          console.log('Permiso de notificación otorgado');

          // Registrar el Service Worker solo si se ha otorgado el permiso
          navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('Service Worker registrado con éxito:', registration);

            // Esperar a que el Service Worker esté activo
            if (registration.active) {
              // Suscribir al usuario después de registrar el Service Worker
              subscribeUserToPushNotifications(registration);
            } else {
              registration.addEventListener('updatefound', () => {
                const installingWorker = registration.installing;
                installingWorker.addEventListener('statechange', () => {
                  if (installingWorker.state === 'activated') {
                    console.log('Service Worker activado');
                    subscribeUserToPushNotifications(registration);
                  }
                });
              });
            }
          }).catch(function (error) {
            console.log('Error al registrar el Service Worker:', error);
          });
        } else {
          console.log('Permiso de notificación denegado');
        }
      });
    }
  }, []);

  // Función para suscribir al usuario a las notificaciones push
  const subscribeUserToPushNotifications = (registration) => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,  
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY 
    }).then(function (subscription) {
      console.log('Usuario suscrito:', subscription);
    }).catch(function (error) {
      console.error('Error al suscribir al usuario:', error);
    });
  };

  return null; 
};

export default PushNotificationManager;
