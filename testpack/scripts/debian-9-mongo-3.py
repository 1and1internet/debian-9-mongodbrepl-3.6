#!/usr/bin/env python3

import unittest
import os
import docker
from selenium import webdriver
import time
from testpack_helper_library.unittests.dockertests import Test1and1Common


class Test1and1MongoImage(Test1and1Common):
    container_ip = None

    @classmethod
    def setUpClass(cls):
        image_to_test = os.getenv("IMAGE_NAME")
        if image_to_test == "":
            raise Exception("I don't know what image to test")
        client = docker.from_env()
        Test1and1Common.container = client.containers.run(
            image=image_to_test,
            remove=True,
            detach=True,
            network_mode="bridge",
            user=10000,
            ports={8080:8080},
            working_dir="/var/www",
            environment={"FIRST_PRIMARY": "true"}
        )

        details = docker.APIClient().inspect_container(container=Test1and1Common.container.id)
        Test1and1MongoImage.container_ip = details['NetworkSettings']['IPAddress']
        time.sleep(5) # Container needs time to start, stop, then restart mongodb before we test.

    # <tests to run>

    def test_docker_logs(self):
        expected_log_lines = [
            "Process 'mongod' changed state to 'RUNNING'"
        ]
        container_logs = self.container.logs().decode('utf-8')
        for expected_log_line in expected_log_lines:
            self.assertTrue(
                container_logs.find(expected_log_line) > -1,
                msg="Docker log line missing: %s from (%s)" % (expected_log_line, container_logs)
            )

    def test_mongo_package(self):
        self.assertPackageIsInstalled("mongodb-org")

    # </tests to run>

if __name__ == '__main__':
    unittest.main(verbosity=1)
