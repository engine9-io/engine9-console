import React, { useState, useEffect } from 'react';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { useSearchParams } from 'react-router';
import { Button } from 'antd';

function QueryStringForm(props) {
  const { fields, query: queryProp } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  let initQuery = queryProp;
  const squery = searchParams.get('query');
  if (squery) initQuery = JSON.parse(squery);
  const [query, setQuery] = useState(initQuery);

  useEffect(() => {
    if (!query?.rules) {
      let initialQuery = query || '{}';
      try {
        if (typeof initialQuery === 'string') initialQuery = JSON.parse(initialQuery);
        else initialQuery = JSON.parse(JSON.stringify(initialQuery));
      } catch (e) {
        return 'Query has an invalid query structure.';
      }

      initialQuery.combinator = initialQuery.combinator || 'and';
      initialQuery.rules = initialQuery.rules || [];

      setQuery(initialQuery);
    }

    return undefined;
  }, [queryProp]);
  return (
    <div className="query-string-form">
      <QueryBuilderAntD key="query-builder">
        <QueryBuilder
          listsAsArrays
          fields={fields}
          query={query}
          onQueryChange={
              (newQuery) => {
                setQuery(newQuery);
              }
            }
        />
      </QueryBuilderAntD>
      <Button
        key="save"
        onClick={() => {
          const formattedQuery = formatQuery(query, 'json_without_ids');
          const p = { ...searchParams, query: formattedQuery };
          setSearchParams(p);
        }}
      >
        Filter
      </Button>
      ,
      {
      formatQuery(query, {
        format: 'natural_language',
        parseNumbers: true,
      })
}
    </div>
  );
}

export default QueryStringForm;
