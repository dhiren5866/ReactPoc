import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { Tab, Header, Card, Image, Grid, Button } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, loading, deletePhoto } = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [deletetarget, DeletesetTarget] = useState<string | undefined>(undefined);

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false))
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ marginBottom: 0 }}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser &&
                        <Button floated='right' onClick={() => setAddPhotoMode(!addPhotoMode)} basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}></Button>}
                </Grid.Column>
            </Grid>
            <Grid.Column width={16}>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
                ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile &&
                                profile.photos.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentUser &&
                                            <Button.Group fluid widths={2}>
                                                <Button name={photo.id} basic positive content='Main' disabled={photo.isMain} loading={loading && target === photo.id} onClick={(e) => { setMainPhoto(photo); setTarget(e.currentTarget.name) }} />
                                                <Button
                                                    basic
                                                    negative
                                                    icon='trash'
                                                    name={photo.id}
                                                    disabled={photo.isMain}
                                                    loading={loading && deletetarget === photo.id}
                                                    onClick={(e) => {
                                                        deletePhoto(photo);
                                                        DeletesetTarget(e.currentTarget.name)
                                                    }} />
                                            </Button.Group>
                                        }
                                    </Card>
                                ))}
                        </Card.Group>
                    )}

            </Grid.Column>

        </Tab.Pane>
    );
};

export default observer(ProfilePhotos);