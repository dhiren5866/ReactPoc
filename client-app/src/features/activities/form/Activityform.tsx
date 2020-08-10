import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, FormGroup } from 'semantic-ui-react';
import { IActivity, IActivityFormValues, ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateandTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate'

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' }))(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
})



interface DetailParam {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const { submitting, activity: initialFormState, loadActivity, clearActivity, createActivity, editActivity } = activityStore;



  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then((activity) => setActivity(new ActivityFormValues(activity))).finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);



  const HandleFinalFormSubmit = (values: any) => {
    const dateandTime = combineDateandTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateandTime;
    if (!activity.id) {
      let newactivity = { ...activity, id: uuid() };
      createActivity(newactivity);
    }
    else {
      editActivity(activity);
    }
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing >
          <FinalForm
            initialValues={activity}
            onSubmit={HandleFinalFormSubmit}
            validate={validate}
            render={({ handleSubmit,invalid,pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name='description'
                  placeholder='Description'
                  value={activity.description}
                  rows={3}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name='category'
                  placeholder='Category'
                  value={activity.category}
                />
                <FormGroup widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={activity.time}
                  />
                </FormGroup>
                <Field
                  component={TextInput}
                  name='city'
                  placeholder='City'
                  value={activity.city}
                />
                <Field
                  component={TextInput}
                  name='venue'
                  placeholder='Venue'
                  value={activity.venue}
                />
                <Button loading={submitting} disabled={loading ||invalid || pristine} floated='right' positive type='submit' content='Submit' />
                <Button
                  onClick={activity.id ? () => history.push(`/activities/${activity.id}`)
                    : () => history.push('/activities')
                  }
                  floated='right'
                  disabled={loading ||invalid || pristine}
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>

  );
};

export default observer(ActivityForm);
