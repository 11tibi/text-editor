import requests


class Judge0:
    BASE_URL = 'https://judge0-ce.p.rapidapi.com/'
    HEADERS = {
        'x-rapidapi-host': "judge0-ce.p.rapidapi.com",
        'x-rapidapi-key': "17f635f5b9msh1fa59d5e28e699ep1e3ab0jsn8e2de6fe83bc"
    }
    QUERYSTRING = {"base64_encoded": "false", "fields": "*"}

    def about(self):
        url = self.BASE_URL + 'about'
        return requests.request('GET', url, headers=self.HEADERS)

    def submission(self, source_code, language_id, stdin=''):
        url = self.BASE_URL + 'submissions'
        payload = {
            'language_id': language_id,
            'source_code': source_code,
            'stdin': stdin
        }

        token = requests.request(
            'POST',
            url,
            headers=self.HEADERS,
            data=payload,
            params=self.QUERYSTRING
        ).json()['token']

        response = self.get_submission(token)
        if response.ok:
            response = response.json()
            new_response = {
                'stdout': response['stdout'],
                'time': response['time'],
                'exit_code': response['exit_code'],

            }
            return new_response
        else:
            return {'error': response.reason}

    def get_submission(self, token):
        url = self.BASE_URL + 'submissions/' + token
        return requests.request('GET', url, headers=self.HEADERS, params=self.QUERYSTRING)

    def get_languages(self):
        url = self.BASE_URL + 'languages'
        return requests.request('GET', url, headers=self.HEADERS).json()
