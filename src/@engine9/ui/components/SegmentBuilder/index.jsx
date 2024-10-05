/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import { QueryBuilderAntD } from '@react-querybuilder/antd';

import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import { useActionFunction } from '@engine9/ui/components/Actions';
import FullWidth from '@engine9/ui/layouts/FullWidth';
import { Button } from 'antd';

import 'react-querybuilder/dist/query-builder.scss';
import './styles.css';

import { useAuthenticatedAxios, useRemoteData } from '../../AuthenticatedDataEndpoint';

export const validator = (r) => !!r.value;
function useQueryFields() {
  const axios = useAuthenticatedAxios();
  const {
    isPending, isFetching, error, data,
  } = useQuery({
    queryKey: ['query-fields'],
    queryFn: () => axios
      .get('/data/query/fields')
      .then((results) => results.data),
  });
  if (isPending || isFetching || error) return { isPending, isFetching, error };
  const d = JSON.parse(JSON.stringify(data));
  d.fields = data.fields.map(
    (f, i) => ({ validator, ...data.fields[i] }),
  );

  return { data: d };
}

export default function SegmentBuilder(props) {
  const {
    properties, parameters = {},
  } = props;

  const [query, setQuery] = useState(null);

  const table = parameters.table || properties.table;
  let id = parameters.id || properties.id;
  if (id === 'create' || id === 'new') id = 0;
  // const { fields } = properties;
  let { title } = properties;

  const onSaveAction = useActionFunction({
    action: 'table.upsert',
    table: 'segment',
  });

  const {
    isPending: fieldPending, isFetching: fieldFetching, error: fieldError, data: fieldData,
  } = useQueryFields();
  const enabled = !!id && !fieldPending && !fieldFetching && !fieldError;
  let initialData;
  if (!id) initialData = { data: [{}] };

  const {
    isPending, isFetching, error, data: response,
  } = useRemoteData({
    enabled,
    initialData,
    uri: `/data/tables/${table}/${id}`,
  });

  useEffect(() => {
    if (response && !query) {
      let initialQuery = response?.[0]?.query || '{}';
      try {
        if (typeof initialQuery === 'string') initialQuery = JSON.parse(initialQuery);
        else initialQuery = JSON.parse(JSON.stringify(initialQuery));
      } catch (e) {
        return `Segment ${id} has an invalid query structure.`;
      }

      initialQuery.combinator = initialQuery.combinator || 'and';
      initialQuery.rules = initialQuery.rules || [];

      console.log('Setting initialQuery ');
      setQuery(initialQuery);
    }

    return undefined;
  }, [response]);

  if (fieldPending || fieldFetching) return <AppLoader />;
  if (fieldError) return <Error500 />;
  if (!fieldData.fields) return 'No fields available for query';

  if (isPending || isFetching) return <AppLoader />;

  if (!!id && !response?.[0]) {
    return <Error404 />;
  }

  const record = response?.[0] || {};

  title = compileTemplate(title || 'No title template')({ record }) || 'Segment Builder';
  const main = [];
  if (error) {
    main.push(<div key="error">Error retrieving segment data</div>);
  } else {
    main.push(
      <QueryBuilderAntD key="query-builder">
        <QueryBuilder
          listsAsArrays
          fields={fieldData.fields}
          query={query}
          onQueryChange={
            (newQuery) => {
              console.log('Setting query');
              setQuery(newQuery);
            }
          }
        />
      </QueryBuilderAntD>,
    );
    main.push(formatQuery(query, 'sql'));
  }

  return (
    <FullWidth
      components={{
        header: [
          title,
          <Button
            key="save"
            onClick={() => {
              const formattedQuery = formatQuery(query, 'json_without_ids');
              onSaveAction({
                data: {
                  id,
                  query: formattedQuery,
                },
                redirect: '/segments/{{data.id}}',
              });
            }}
          >
            Save
          </Button>,
          <Button
            key="preview"
            onClick={() => {
              const formattedQuery = formatQuery(query, 'json_without_ids');
              onSaveAction({
                data: {
                  id,
                  query: formattedQuery,
                },
                redirect: '/segments/{{data.id}}/review',
              });
            }}
          >
            Save & Review
          </Button>,
        ],
        main,
      }}
    />
  );
}
