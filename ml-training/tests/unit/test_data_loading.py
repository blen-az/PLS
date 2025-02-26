import pytest
from src.data.generator import generate_synthetic_data

def test_data_generation():
    df = generate_synthetic_data()
    assert not df.empty
    assert "difficulty" in df.columns
    assert len(df) == 10000  # From config.yaml