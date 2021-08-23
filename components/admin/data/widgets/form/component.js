import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';

// components
import Step1 from 'components/admin/data/widgets/form/steps';
import Spinner from 'components/ui/spinner';

// services
import { fetchDatasets, fetchDataset } from 'services/dataset';
import {
  fetchWidget,
  deleteWidget,
  updateWidget as updateWidgetService,
  createWidget as createWidgetService,
  createWidgetMetadata,
  updateWidgetMetadata
} from 'services/widget';

// constants
import { FORM_ELEMENTS } from './constants';

function WidgetForm(props) {
  const { id, application, dataset } = props;
  const [loading, setLoading] = useState(false);
  const [datasets, setDatasets] = useState([]);
  const [widget, setWidget] = useState(null);
  const [form, setForm] = useState({});
  const router = useRouter();

  useEffect(() => {
    const editionMode = !!id;
    setLoading(true);

    // ----- EDITION MODE ------
    if (editionMode) {
      loadWidget(id);
    }
    // ------- NEW WIDGET MODE ------
    else {
      if (application === 'rw') {
        fetchDataset(dataset)
          .then((datasetResponse) => {
            setDatasets([mapDataset(datasetResponse)]);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            toastr.error(`There was an error loading the dataset ${dataset}: ${error}`);
          });
      } else {
        // TO-DO: replace this for a dynamic search or lazy loading
        fetchDatasets({
          application: [process.env.APPLICATIONS].join(','),
          'page[size]': 9999999,
          sort: 'name',
          env: process.env.API_ENV,
          includes: 'metadata'
        })
          .then((datasetsResponse) => {
            setDatasets(datasetsResponse.map(_dataset => mapDataset(_dataset)));
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            toastr.error(`There was an error loading the datasets ${error}`);
          });
      }
    }
  }, [id]);

  const loadWidget = (id) => {
    fetchWidget(id, { includes: 'metadata' })
      .then((widgetResponse) => {
        setWidget(widgetResponse);
        setForm(widgetResponse);
        if (datasets.length === 0) {
          // we need to load the widget dataset
          fetchDataset(widgetResponse.dataset)
            .then((dataset) => {
              setDatasets([mapDataset(dataset)]);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              toastr.error(`There was an error loading the dataset with ID ${widgetResponse.dataset}: ${error}`);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toastr.error(`There was an error loading the widget with ID ${id}: ${error}`);
      });
  };

  const mapDataset = (datasetValue) => ({
    label: datasetValue.name,
    value: datasetValue.id,
    type: datasetValue.type,
    tableName: datasetValue.tableName,
    slug: datasetValue.slug
  });

  const onWidgetSave = (widget) => {
    const { widgetConfig, name, description, metadata } = widget;
    // Validate the form
    FORM_ELEMENTS.validate();
    const valid = FORM_ELEMENTS.isValid();
    if (valid) {
      setLoading(true);
      const formObj = {
        ...form,
        widgetConfig,
        name,
        description
      };

      if (formObj.sourceUrl === '') {
        delete formObj.sourceUrl;
      }

      if (id) {
        updateWidget(formObj, metadata);
      } else {
        createWidget(formObj, metadata);
      }
    } else {
      toastr.error('Error', 'Fill all the required fields or correct the invalid values');
    }
  };

  const onChange = (obj) => {
    setForm({
      ...form,
      ...obj
    });
  };

  const createWidget = (widget, metadata) => {
    const { onSubmit, authorization, dataset: queryDataset } = props;
    const { dataset } = form;

    const datasetValue = dataset || queryDataset;
    
    createWidgetService(widget, datasetValue, authorization)
      .then((response) => {
        const { id, name } = response;
        // We need to create the widget metadata now
        createWidgetMetadata(
          id,
          datasetValue,
          {
            language: 'en',
            info: { caption: metadata && metadata.caption }
          },
          authorization
        )
          .then(() => {
            toastr.success('Success', `The widget "${id}" - "${name}" has been created correctly`);
            setLoading(false);
            if (onSubmit) onSubmit(response);
          });
      })
      .catch((error) => {
        setLoading(false);
        toastr.error('Tnere was an error', error);
      });
  };

  const updateWidget = (widget, metadata) => {
    const { onSubmit, authorization } = props;

    updateWidgetService(widget, authorization)
      .then((response) => {
        const { id, name, dataset } = response;
        if (widget.metadata && widget.metadata.length > 0) {
          // A metadata object already exists for this widget so we have to update it
          updateWidgetMetadata(
            id,
            dataset,
            metadata[0],
            authorization
          )
            .then(() => {
              toastr.success('Success', `The widget "${id}" - "${name}" has been updated correctly`);
              setLoading(false);
              if (onSubmit) onSubmit(response);
            });
        } else {
          // There is no metadata for this widget so we need to create it
          createWidgetMetadata(
            id,
            dataset,
            {
              language: 'en',
              application: process.env.APPLICATIONS,
              info: { caption: metadata && metadata.caption }
            },
            authorization
          )
            .then(() => {
              toastr.success('Success', `The widget "${id}" - "${name}" has been updated correctly`);
              setLoading(false);
              if (onSubmit) onSubmit(response);
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        toastr.error(`Tnere was an error: ${error}`);
      });
  };

  const handleDelete = () => {
    const { name, dataset, id } = form;
    const { authorization } = props;

    toastr.confirm(`Are you sure that you want to delete the widget: "${name}"`, {
      onOk: () => {
        deleteWidget(id, dataset, authorization)
          .then(() => {
            toastr.success('Success', `The widget "${id}" - "${name}" has been removed correctly`);
            router.push(`/admin/data/datasets/${dataset}/widgets`);
          })
          .catch((err) => {
            toastr.error(
              'Error',
              `The widget "${id}" - "${name}" was not deleted. Try again. ${err.message}`
            );
          });
      }
    });
  };

  return (
    <form 
      className="c-form"
      noValidate
    >
      <Spinner isLoading={loading} className="-light" />
      {!loading && (
        <Step1
          id={id}
          form={form}
          datasets={datasets}
          onChange={value => onChange(value)}
          onSave={onWidgetSave}
        />
      )}
    </form>
  );

}

WidgetForm.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  dataset: PropTypes.string
};

WidgetForm.defaultProps = {
  id: null,
  dataset: null
};

export default WidgetForm;
