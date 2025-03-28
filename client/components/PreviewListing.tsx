import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Edit, Check } from 'lucide-react';
import styles from './PreviewListing.module.css';

interface PropertyData {
  name: string;
  type: string;
  location: string;
  description: string;
  amenities: string[];
  photoUrls: string[];
  price: string;
  availableFrom: string;
  availableTo: string;
}

function PreviewListing() {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  
  useEffect(() => {
    const data = localStorage.getItem('propertyData');
    if (data) {
      setPropertyData(JSON.parse(data));
    }
  }, []);

  if (!propertyData) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingSpinner} />
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.previewCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Preview Your Listing</h1>
          <p className={styles.subtitle}>Review your property details before publishing</p>
        </div>

        <div className={styles.content}>
          <div className={styles.imageGrid}>
            {propertyData.photoUrls.length > 0 ? (
              propertyData.photoUrls.map((url, index) => (
                <div 
                  key={index} 
                  className={`${styles.imageContainer} ${index === 0 ? styles.mainImage : ''}`}
                >
                  <img src={url} alt={`Property ${index + 1}`} />
                </div>
              ))
            ) : (
              <div className={styles.noImages}>
                <p>No images uploaded</p>
              </div>
            )}
          </div>

          <div className={styles.propertyDetails}>
            <div className={styles.titleSection}>
              <h2 className={styles.propertyName}>{propertyData.name}</h2>
              <span className={styles.propertyType}>{propertyData.type}</span>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <span>{propertyData.location}</span>
              </div>
              <div className={styles.infoItem}>
                <DollarSign className={styles.infoIcon} />
                <span>${propertyData.price} per day</span>
              </div>
              <div className={styles.infoItem}>
                <Calendar className={styles.infoIcon} />
                <span>
                  {formatDate(propertyData.availableFrom)} - {formatDate(propertyData.availableTo)}
                </span>
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <p className={styles.description}>{propertyData.description}</p>
            </div>

            <div className={styles.amenitiesSection}>
              <h3 className={styles.sectionTitle}>Amenities</h3>
              <div className={styles.amenitiesList}>
                {propertyData.amenities.map((amenity) => (
                  <span key={amenity} className={styles.amenityTag}>
                    <Check className={styles.amenityIcon} />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => navigate('/post-property')}
            className={styles.editButton}
          >
            <Edit className={styles.buttonIcon} />
            Edit Listing
          </button>
          <button
            onClick={() => navigate('/')}
            className={styles.publishButton}
          >
            <Check className={styles.buttonIcon} />
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewListing;